import { LightningElement, api, wire, track } from 'lwc';
import sendEmail from '@salesforce/apex/EmailHandler.sendEmail';

//importing to show toast notifictions 
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class SendEmail extends LightningElement {
    @track isModalOpen = false;
    @track toAddress = '';
    @track subject = '';
    @track body = '';
 
    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleChange(event) {
        if(event.target.name === 'toAddress') {
            this.toAddress = event.target.value;
        }
        if(event.target.name === 'subject') {
            this.subject = event.target.value;
        }
        if(event.target.name === 'body') {
            this.body = event.target.value;
        }
    }
    
    sendEmailHandler() {
        //send email
        console.log('Sending email to: '+this.toAddress);
        sendEmail({ toAddress: this.toAddress, subject: this.subject, body: this.body})
        //show success and error messsages
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Email sent successfully',
                    variant: 'success'
                }),
            );
            console.log('Result: '+JSON.stringify(result));
            this.isModalOpen=false;
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error sending email',
                    message: error.body.message,
                    variant: 'error'
                }),
            );
            console.log('Error: '+JSON.stringify(error));
        });
    }
}