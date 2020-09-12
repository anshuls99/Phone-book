import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Contact} from './contact';
import {ContactService} from './contact.service';




@Component({
  selector: 'app-contacts',
  providers : [ContactService],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  
  
})


export class ContactsComponent implements OnInit {

  contact: Contact;
  contacts: Contact[];
  title = 'angularpopup';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  showDetails: boolean;
  searchKey : string;
  searchText : string;
  


  constructor(private formBuilder: FormBuilder,
              private contactSer:ContactService) {
      this.contact = new Contact();
      this.contacts= this.contactSer.getContacts();

  }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(4)]],
        lastname: ['', [Validators.required, Validators.minLength(6)]],
        mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
    });
    this.showDetails = false;

}

public get firstname()
{
  return this.registerForm.get('firstname');
}
public get lastname()
{
  return this.registerForm.get('lastname');
}
public get mobile()
{
  return this.registerForm.get('mobile');
}

get f() { return this.registerForm.controls; }

onSubmit() {
    
    this.contactSer.addContact(this.contact);
    this.showDetails= true;
    this.contact.firstname= this.firstname.value;
    this.contact.lastname= this.lastname.value;
    this.contact.mobile= this.mobile.value;
      
    this.contact= new Contact();

    this.hide();

   console.log(this.submitted)

}
onDelete()
    {
      this.contactSer.deleteContact(this.contact);
    }
  
OnSearch()
    {
      if(!this.searchKey)
      this.onClose1();
      else
      this.contacts = this.contactSer.getContacts().filter(a=>a.firstname.toLowerCase().includes(this.searchKey.trim().toLowerCase())||a.lastname.toLowerCase().includes(this.searchKey.trim().toLowerCase()));
    }
onClose1() 
{
  this.contacts = this.contactSer.getContacts();
  this.searchKey='';
}
onSortbyName()
    {
      this.contacts.sort((a, b) => (a.firstname < b.firstname ? -1 : 1));
    }
onSortbyNumber()
{
  this.contacts.sort((a, b) => (a.mobile < b.mobile ? -1 : 1));
}
}