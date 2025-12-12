(async () => {
  const headerLogin = document.querySelector("#headerLogin");
  const heroLoginBtn = document.querySelector("#heroLoginBtn");
  const headerSideBarLogin = document.querySelector("#headerSideBarLogin");
  const { error } = await supabase.auth.getUser();
  if (!error) {
    headerLogin.innerText = "ادخل إلى المنصة";
    headerLogin.href = "https://app.mokrane.xyz";
    headerSideBarLogin.innerText = "ادخل إلى المنصة";
    headerSideBarLogin.href = "https://app.mokrane.xyz";
    heroLoginBtn.innerText = "ادخل إلى المنصة";
    heroLoginBtn.href = "https://app.mokrane.xyz";
  }
})();
