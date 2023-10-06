import { v4 as uuid } from 'uuid';
import cloneDeep from 'lodash.clonedeep';
import { NextFunction } from 'express';
import { IResponse, IResponseError } from '../scheme/ServiceUtils';

export const getUUID = ()=>{
	return uuid();
};

export const createDeepCopy = <T>(arr: T[]): T[] =>{
	return cloneDeep(arr);
}


export const promiseHandler = async <T>(prom: Promise<T>, next:NextFunction)=>{
	try {
    return await prom;
  } catch (error) {
		console.log('HERE')
		console.log(error)
    next(error);
  }
}

export const getResponseError = async (message:string):Promise<IResponseError>=>{
	return {
		data:null,
		error:{
			message: message
		}
	}
}

export const getResponse = ():IResponse=>{
	return {
		data:"",
		error:null
	}
}
