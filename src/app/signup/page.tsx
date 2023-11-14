import SignUpComponent from "./component";

export default function Signup() {
  return (
    <div className="container mx-auto flex flex-row justify-center pt-8">
      <div className="pt-4 basis-4/5 lg:basis-1/3">
        <SignUpComponent />
      </div>
    </div>
  )
}