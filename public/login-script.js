window.onload = () => {
    let login = document.querySelector(".submit-btn")

    login.addEventListener("click", async () => {
        let email = document.querySelector("#email").value
        let senha = document.querySelector("#senha").value
        await fetch(window.location.href + "/auth", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
        })
            .then((response) => response.json())
            .then((data) => {
                window.localStorage.setItem("token", data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    })
}
