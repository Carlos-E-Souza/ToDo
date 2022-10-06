window.onload = () => {
    const closeMessage = document.querySelector("#close-message")
    const message = document.querySelector(".message")

    closeMessage.addEventListener("click", () => {
        message.style.display = "none"
    })

    setTimeout(() => {
        message.style.display = "none"
    }, 5000)

    const addBtn = document.querySelector("#addButton")
    addBtn.addEventListener("click", async () => {
        const text = document.querySelector("#task")
        await fetch(window.location.href)
    })
}
