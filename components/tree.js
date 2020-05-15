export default function(data) {
    // receba a tag principal que recebe o menu
    const tree = document.querySelector('nav#tree')

    // receba toda a arvore de elementos
    const menu = document.createElement('ul')

    
    const firstLevel = data.filter(item => !item.parent)
    const getFirstLis = firstLevel.map(buildTree) // retorna array com li
    getFirstLis.forEach(li => menu.append(li)) // adiciona lis ao menu

    function buildTree(item) {

        //primeiro elemento
        const li = document.createElement('li')
        li.innerHTML = item.name

        const children = data.filter(child => child.parent === item.id)

        if(children.length > 0) {

            //adiciona o click para os parent
            li.addEventListener('click', event => {
                event.stopPropagation()
                event.target.classList.toggle('open')
            })

            //adiciona uma classe para indentificar que possui filhos
            li.classList.add('has-children')

            //constroi os filhos
            const subMenu = document.createElement('ul')
            children.map(buildTree)
            .forEach(li => subMenu.append(li))
            li.append(subMenu)
            
        }

        // adiciona os elementos ao menu
        return li

        
    }

    // adiciona o menu no HTML
    tree.append(menu)
}