function createElement<T extends keyof HTMLElementTagNameMap>(
    tag: T, 
    options: Partial<HTMLElementTagNameMap[T]>
    ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);

    if(options){
        Object.assign(element, options);
    }

    return element;
}

export { createElement };