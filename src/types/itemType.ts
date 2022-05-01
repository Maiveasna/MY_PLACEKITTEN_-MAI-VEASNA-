
    export interface Category {
        id?: number;
        name?: string;
    }

    export interface ItemType {
        id?: string;
        url?: any;
        width?: number;
        height?: number;
        name ?: string ;
        description ?: string ,
        breeds ?: [
            {
                name ?: string,
                description ?: string
            }
        ]
        
    }

