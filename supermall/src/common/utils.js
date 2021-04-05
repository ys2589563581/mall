//防抖函数
export function debounce(fnc, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            /*
            return以及函数它的调用者都是window，所以这里不存在this指向的问题，
            但当我们需要传入参数数组时，而这个参数个数又不确定，我们只能用argument来接受不确定个数的参数，
            因为fn接受的是单一的参数，而不是数组，因此我们采用apply来接受这个数组
            */
            fnc.apply(this, args)
        }, delay)
    }
}