export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/move/horarios`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const horarios = await res.json()

  return Response.json({ horarios })
}