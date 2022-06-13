import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import {
  QueryClient,
  QueryClientProvider
} from "react-query";
import { useState, useEffect } from "react";
import { supabase } from "./api/supabaseClient";
import Tasks from "./Tasks";

const RoutesComponent = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
      },
    },
  });


 return (
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <Routes>
      {session ? <Route path="/" element={<Tasks />} /> : <Route path="/" element={<Auth />} />}
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  )
};

export default RoutesComponent;
