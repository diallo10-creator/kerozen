import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CalendlyEvent {
  uri: string
  name: string
  status: string
  start_time: string
  end_time: string
  event_type: {
    name: string
    duration: number
  }
  invitees: Array<{
    uri: string
    name: string
    email: string
    status: string
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const calendlyToken = Deno.env.get('CALENDLY_ACCESS_TOKEN')
    
    if (!calendlyToken) {
      console.error('CALENDLY_ACCESS_TOKEN not found')
      return new Response(
        JSON.stringify({ error: 'Configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const url = new URL(req.url)
    let action = url.searchParams.get('action')
    
    // Also check the request body for action parameter
    if (!action && req.method === 'POST') {
      const body = await req.json()
      action = body.action || 'events'
    } else {
      action = action || 'events'
    }

    console.log(`Calendly API request - Action: ${action}`)

    const calendlyHeaders = {
      'Authorization': `Bearer ${calendlyToken}`,
      'Content-Type': 'application/json'
    }

    let response
    
    switch (action) {
      case 'user':
        // Get current user info
        response = await fetch('https://api.calendly.com/users/me', {
          headers: calendlyHeaders
        })
        break
        
      case 'event-types':
        // Get user's event types
        const userResponse = await fetch('https://api.calendly.com/users/me', {
          headers: calendlyHeaders
        })
        const userData = await userResponse.json()
        const userUri = userData.resource.uri
        
        response = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
          headers: calendlyHeaders
        })
        break
        
      case 'events':
        // Get scheduled events
        const userResp = await fetch('https://api.calendly.com/users/me', {
          headers: calendlyHeaders
        })
        const userDat = await userResp.json()
        const ownerUri = userDat.resource.uri
        
        response = await fetch(`https://api.calendly.com/scheduled_events?user=${ownerUri}&status=active`, {
          headers: calendlyHeaders
        })
        break
        
      case 'availability':
        // Get availability for a specific event type
        const eventTypeUri = url.searchParams.get('event_type_uri')
        if (!eventTypeUri) {
          return new Response(
            JSON.stringify({ error: 'event_type_uri parameter required' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
        
        const startTime = url.searchParams.get('start_time') || new Date().toISOString()
        const endTime = url.searchParams.get('end_time') || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        
        response = await fetch(`https://api.calendly.com/event_type_available_times?event_type=${eventTypeUri}&start_time=${startTime}&end_time=${endTime}`, {
          headers: calendlyHeaders
        })
        break
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action parameter' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }

    if (!response.ok) {
      console.error(`Calendly API error: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      
      return new Response(
        JSON.stringify({ 
          error: 'Calendly API error',
          details: errorText,
          status: response.status 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    console.log(`Calendly API success - Action: ${action}`)

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in calendly-api function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})