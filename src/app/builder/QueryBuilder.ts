import { Query } from "mongoose";
import { string, unknown } from "zod";

class QueryBuilder<T> {
    public modelQuery: Query<T[],T>;
    public query : Record<string, unknown>;

    constructor(modelQuery: Query<T[],T>, query: Record<string,unknown>){
        (this.modelQuery = modelQuery), (this.query = query)
    }
,}