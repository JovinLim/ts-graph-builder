import { render } from 'solid-js/web';

export const debugUtils = {
    graphName : "test",
    datasetName: "dataset-test",
}

export function toElement(s='',c : any = undefined, t=document.createElement('template'),l='length')
{t.innerHTML=s.trim();c=[...t.content.childNodes];return c[l]>1?c:c[0]||'';}