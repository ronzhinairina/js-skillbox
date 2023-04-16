export function createNewTaskElement(taskString) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const deleteButton = document.createElement("button");
    label.innerText = taskString;

    checkBox.type = "checkbox";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    return listItem;
}