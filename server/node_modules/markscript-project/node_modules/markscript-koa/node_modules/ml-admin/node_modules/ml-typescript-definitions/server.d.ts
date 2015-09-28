declare module xdmp {
  export function documentInsert(uri: string, content: any)

  export function documentDelete(uri: string)

  export interface HttpOptions {
    // TODO
  }

  export function log(msg: any): void

  export function directory<T>(dir: string, depth?: number): cts.ValueIterator<T>
  export function nodeUri(node: Node): string

  export function httpGet(uri: string, options: HttpOptions)
  export function httpPost(uri: string, options: HttpOptions, data: any)
  export function httpPut(uri: string, options: HttpOptions, data: any)
  export function httpDelete(uri: string, options: HttpOptions)

  export function lockForUpdate(uri: string): void
  export function lockAcquire(uri: string): void
  export function lockRelease(uri: string): void

  export function nodeReplace(oldNode: any, newNode: any): void

  export function arrayValues<T>(values: T[], flatten?: boolean): cts.ValueIterator<T>
}

declare module cts {
  export interface DocumentNode<T> extends Node<T> {
    root: T & Node<T>
    documentFormat: string
  }

  export enum NodeType {
    ELEMENT_NODE = 1,
    ATTRIBUTE_NODE = 2,
    TEXT_NODE = 3,
    PROCESSING_INSTRUCTION_NODE = 7,
    COMMENT_NODE = 8,
    DOCUMENT_NODE = 9,
    BINARY_NODE = 13,
    NULL_NODE = 14,
    BOOLEAN_NODE = 15,
    NUMBER_NODE = 16,
    ARRAY_NODE = 17,
    OBJECT_NODE = 18
  }

  export interface Node<T> {
    baseURI: string
    valueOf(): any
    toObject(): T
    nodeType: NodeType
    xpath(xpathExpression: string, namespaceBindings: { [nsPrefix: string]: string }): any
  }

  export interface ValueIterator<T> extends Iterator<DocumentNode<T>> {
    count: number
    clone(): ValueIterator<T>
    toArray(): T[]
  }

  export interface Reference {
    // TODO
  }

  export interface Query {
    // TODO
  }

  export function pathReference(path: string): Reference

  export function values(reference: Reference): ValueIterator<string>

  export function frequency(value: string): number

  export function doc<T>(uri: string): DocumentNode<T>

  export function search(query: Query): cts.ValueIterator<any>

  export function andQuery(querys: Query[]): Query

  export function wordQuery(query: string|string[]): Query

  export function documentQuery(uri: string): Query
}

declare module fn {
  export function doc(uri: string): cts.ValueIterator<any>
}

declare function declareUpdate(): void
