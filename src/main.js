const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
// 如果x存在就xObject，否则就给hash默认初始值
const hashMap = xObject || [
    { logo: 'I', url: 'https://www.iconfont.cn' },
    { logo: 'F', url: 'https://www.figma.com/' },
];

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}


const render = () => {
    $siteList.find('li:not(.last)').remove() // 找到所有li，唯独不要最后一个 
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class = "close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？')
        console.log(url)
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        render()
    })


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}


$(document).on('keypress', (e) => {
    //const key = e.key
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

$("input.search").on('keypress', (e) => {
    e.stopPropagation()
})


