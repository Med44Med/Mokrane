function cookieStorage() {
  return {
    getItem: (key) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + key + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    },
    setItem: (key, value) => {
      document.cookie = `${key}=${encodeURIComponent(
        value
      )}; Path=/; Domain= 127.0.0.1; SameSite=Lax; Secure=false;`;
    },
    removeItem: (key) => {
      document.cookie = `${key}=; Path=/; Domain= 127.0.0.1; Max-Age=0;`;
    },
  };
}

window.supabase = supabase.createClient(
  "https://mveltpahqvsqdmbhlpxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12ZWx0cGFocXZzcWRtYmhscHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MDEzOTMsImV4cCI6MjA3OTA3NzM5M30.iqJxZFUdzAHESHHj1T-rwvSUE9ykniI2yfX6mRgwrnQ",
  {
    auth: {
      storage: cookieStorage(),
      detectSessionInUrl: true,
    },
  }
);
