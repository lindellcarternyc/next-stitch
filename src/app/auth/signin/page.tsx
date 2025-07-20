import { SigninForm } from "./(components)/signin-form";
import { signin } from "@/lib/actions.auth";

export default function SigninPage() {
  return (
    <div className="text-center flex flex-col gap-4 p-4">
      <h1 className="text-2xl md:text-3xl">Signin</h1>
      <div>
        <SigninForm signin={signin} />
      </div>
    </div>
  );
}
