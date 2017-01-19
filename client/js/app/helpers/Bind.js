class Bind{

    constructor(modelo, view, ...props){
        let proxy = ProxyFactory.create(
            modelo,
            props,
            model => view.update(model));

        view.update(modelo);

        return proxy;
    }

}