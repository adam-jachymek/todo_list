import { useState } from "react";
import { supabase } from "./api/supabaseClient";
import { useMutation } from "react-query";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const authMutation = useMutation(async (email) => {
    const { error } = await supabase.auth.signIn({ email });
    if (error) throw error;
    alert("Check your email for the login link!");
    return error;
  }, {});

  const handleLogin = async (e) => {
    e.preventDefault();
    authMutation.mutate(email);
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <p className="description">
          Sign in via magic link with your email below
        </p>
        {loading ? (
          "Sending magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
