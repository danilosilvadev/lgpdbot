import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { URL_REGEX } from '../../../utils'
import { Domain } from 'src/app/models/domain.model';



@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss']
})
export class DomainFormComponent implements OnInit {

  domainForm: FormGroup;
  @Output() registerDomain = new EventEmitter();
  @Output() updateDomain = new EventEmitter();

  @Input() editDomain: Domain;
  @Input() isEditing: boolean;


  constructor() { 

  }

  ngOnInit() {
    this.domainForm = new FormGroup({
      index: new FormControl({ value: null, disabled: true } ),
      name: new FormControl("", Validators.required),
      url: new FormControl("", [ Validators.required, Validators.pattern(URL_REGEX) ]),
    })


  }

  setFormValues() {
    console.log('edit form')
    this.domainForm.setValue({
      did: this.editDomain.did,
      name: this.editDomain.name,
      url: this.editDomain.url,
      active: this.editDomain.active,
    })
     
  }  

  onSubmit(form) {
    let index = form.getRawValue().index;
    index !== null 
    ? this.updateDomain.emit({ ...this.domainForm.value })
    : this.registerDomain.emit({ ...this.domainForm.value });
    this.domainForm.reset();;
  }

}
