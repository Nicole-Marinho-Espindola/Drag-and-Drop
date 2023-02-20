
// faz uma consulta pegando todos os elementos com a classe "card"
const card = document.querySelectorAll(".card");

// quando é selecionado um item do tipo "draggable"
document.addEventListener("dragstart", (e) => {
// ele irá adicionar a class "dragging" quando esse item estiver sendo arrastado
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
// ele irá remover a class "dragging" quando esse item estiver sendo arrastado
    e.target.classList.remove("dragging");
});

// a cada card será adicionado o evento "dragover" que vai identificar quando 
// o item arrastado esta em cima do card

card.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(item, e.clientY);

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging);
        }
    });
});

function getNewPosition(cardElement, posY) {
    const cards = cardElement.querySelectorAll(".item:not(.dragging)");
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if (posY >= boxCenterY) result = refer_card;
    }

    return result;
}
