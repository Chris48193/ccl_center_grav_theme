require('../scss/svg.scss')

$('.reveal').foundation()

const classes = window.classes || 'svg-trigger'

triggers.forEach((trigger) => {
    $(`#${trigger}`)
        .addClass(classes)
        .click((e) => {
            $(`#${$(e.currentTarget).attr('id')}-modal`).foundation('open')
        })
})

const hash = window.location.hash
if(hash != ''){
    $(hash + '-modal').foundation('open')
}