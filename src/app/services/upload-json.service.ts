import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { JsonFormControls } from "../models/json-form-controls";

@Injectable({
    providedIn: 'root'
})
export class UploadJsonService {
    updateJsonDate = new BehaviorSubject<JsonFormControls>(new JsonFormControls());

    setJsonData(jsonData: JsonFormControls) {
        this.updateJsonDate.next(jsonData);
    }

    getJsonData() {
        return this.updateJsonDate.asObservable();
    }
}