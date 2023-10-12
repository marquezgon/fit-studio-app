export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/indoor-cycling/book-class/6a6facb4-20e0-4a42-be73-205554fbec19`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const horarios = await res.json()

  return Response.json({ horarios })
}