export async function GET(request: Request) {
  const info = new URL(request.url)

  const startDate = info.searchParams.get('start')
  const endDate = info.searchParams.get('end')
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/move/horarios?start=${startDate}&end=${endDate}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  })
  const horarios = await res.json()

  return Response.json({ horarios })
}