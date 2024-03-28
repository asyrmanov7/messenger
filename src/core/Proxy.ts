type PropKey = string | symbol
const props: {
    name: string,
    chat: string,
    getChat: () => void,
    _privateMethod: () => void,
    __privateMethodToo: () => void,
    _privateProp: string,
    [key: string]: any
} = {
    name: "Abby",
    chat: "the last of us. Part II",
    getChat() {
        this._privateMethod();
    },
    _privateMethod(){
        console.log(this._privateProp)
    },
    __privateMethodToo() {},
    _privateProp: "Нельзя просто так"

}

const checkPrivateProp = (prop: PropKey) => typeof prop === "string" && prop.startsWith("_")

const proxyProps = new Proxy(props, {
    get (target, prop: string) {
        if (checkPrivateProp(prop)) {
            throw new Error("Нет прав")
        } else {
            const value = target[prop];
            return (typeof value === "function") ? value.bind(target) : value
        }
    },

    set (target, prop: string, val: any): boolean {
        if (checkPrivateProp((prop))) {
            throw new Error("Нет прав")
        } else {
            target[prop] = val
            return true
        }
    },

    deleteProperty(target: {
        name: string;
        chat: string;
        getChat: () => void;
        _privateMethod: () => void;
        __privateMethodToo: () => void;
        _privateProp: string;
        [prop: string]: any
    }, prop: string): boolean {
        if (checkPrivateProp(prop)) {
            throw new Error("Нет прав")
        } else {
            delete target[prop]
            return true
        }
    }
})
