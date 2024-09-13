import { createSignal } from "solid-js";
import {v4 as uuidv4} from 'uuid';

export const [uploadedFile, setUploadedFile] = createSignal<File>();
export const [alerts, setAlerts] = createSignal<{date:string, title:string, message:string, id:string}[]>([]);


export function createAlert(title: string, message: string) {
	setAlerts([...alerts(), 
		{date:Date.toString(), title:title, message:message, id:uuidv4().toString()}
	]);
}