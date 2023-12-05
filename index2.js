let draggables = document.querySelectorAll('.draggable')
let containers = document.querySelectorAll('.card-container')


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart' , () =>{
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend' , () =>{
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover' , e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if(afterElement==null){
            container.appendChild(draggable)
        }else {
            container.insertBefore(draggable, afterElement);
        }
    })
})

function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child}
        }else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY }).element

}
function addNewParagraph() {
    // Create a new paragraph element
    var newParagraph = document.createElement('p');

    // Set some attributes to the new paragraph
    newParagraph.className = 'draggable';
    newParagraph.draggable = true;
    newParagraph.innerHTML = 'New Paragraph Content';

    // Get the existing card-body element
    var cardBody = document.querySelector('.card-container');

    // Append the new paragraph below the existing content
    cardBody.appendChild(newParagraph);

    draggables = document.querySelectorAll('.draggable');
    containers = document.querySelectorAll('.card-container');
}