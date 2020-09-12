import {Contact} from './contact';

export class ContactService{
    private contacts : Contact[];

    constructor()
{
    this.contacts=[];
    var contact1,contact2;
    contact1= new Contact();
    contact1.firstname="Anshul";
    contact1.lastname="Sharma";
    contact1.mobile="1212121212"
    this.contacts.push(contact1);
    contact2= new Contact();
    contact2.firstname="Anish";
    contact2.lastname="jain";
    contact2.mobile="2342435233"
    this.contacts.push(contact2);
}

getContacts():Contact[]
{
    return this.contacts;
}
addContact(c:Contact)
{
    this.contacts.push(c);
}
deleteContact(c:Contact)
{
    this.contacts.pop();
}

}
