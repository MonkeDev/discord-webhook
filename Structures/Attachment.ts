export default (url: string, name: string, buffer: ArrayBuffer) => {
    if(url) {
        buffer = await fetch(url).then(res => res.arrayBuffer());
    } else if(!buffer) throw new TypeError('Neither an URL or buffer was provided.');

    return {
        name,
        buffer
    };
}