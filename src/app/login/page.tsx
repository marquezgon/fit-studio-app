/* eslint-disable @next/next/no-img-element */

import LogInComponent from "./component"

export default function SignIn() {
  return (
    <div className="container mx-auto flex flex-row justify-center pt-20">
      <div className="pt-8 basis-4/5 lg:basis-1/3">
        <LogInComponent />
      </div>
    </div>
  )
}