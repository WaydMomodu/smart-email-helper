import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Verify API key is present
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('OpenRouter API key not found in environment variables');
    return NextResponse.json(
      { error: 'OpenRouter API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Parse and validate request body
    const body = await request.json();
    const { purpose, tone } = body;

    if (!purpose || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields: purpose and tone' },
        { status: 400 }
      );
    }

    console.log('Generating email with:', { purpose, tone });

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://github.com/OpenRouterTeam/openrouter',
        'X-Title': 'Smart Email Helper'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-2',
        messages: [{
          role: 'user',
          content: `Write a ${tone.toLowerCase()} email about: ${purpose}

Please write a clear, professional email that is:
- In a ${tone.toLowerCase()} tone
- Concise and well-structured
- Including a greeting and sign-off
- Approximately 100-150 words

Provide only the email content with no additional explanations.`
        }],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    // Parse OpenRouter response
    const data = await response.json();
    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      console.error('OpenRouter API error:', data);
      return NextResponse.json(
        { error: 'Failed to generate email: ' + (data.error?.message || 'Unknown error') },
        { status: response.status }
      );
    }

    // Extract and validate the generated message
    const generatedMessage = data.choices?.[0]?.message?.content;
    if (!generatedMessage) {
      console.error('Invalid response format from OpenRouter:', data);
      return NextResponse.json(
        { error: 'Invalid response format from AI service' },
        { status: 500 }
      );
    }

    // Return the generated email
    return NextResponse.json({ message: generatedMessage.trim() });

  } catch (error) {
    // Log any unexpected errors
    console.error('Error in email generation:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
} 