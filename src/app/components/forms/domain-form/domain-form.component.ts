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
  domainFormGroup: FormGroup;
  @Output() registerDomain = new EventEmitter();
  @Output() updateDomain = new EventEmitter();
  editMode: boolean;

  constructor() {}

  ngOnInit() {
    this.domainFormGroup = new FormGroup({
      did: new FormControl(""),
      active: new FormControl(""),
      name: new FormControl("", Validators.required),
      url: new FormControl("", [ Validators.required, Validators.pattern(URL_REGEX) ]),
    });

  }

  onSubmit(form) {
    if (this.editMode) {
      this.updateDomain.emit({
        ...this.domainFormGroup.value
      });
    } else {
      this.registerDomain.emit({
        ...this.domainFormGroup.value,
      });
    }
    this.domainFormGroup.reset();
  }

}
