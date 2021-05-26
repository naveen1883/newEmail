public with sharing class EmailHandler {
   @AuraEnabled
   public static void sendEmail(List<String> toAddress, String subject, String body) {      
         Messaging.reserveSingleEmailCapacity(1);
         try{
         messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
         
         System.debug(toAddress);
         System.debug(subject);
         System.debug(body);
         // toAddress.add('');
               
         mail.setToAddresses(toAddress);
         mail.setReplyTo('no-reply@salesforce.com');
         mail.setSenderDisplayName('Salesforce Test');
         mail.setSubject(subject);
         mail.setHtmlBody(body);
         // mail.setEntityAttachments(files);
         Messaging.sendEmail(new List<messaging.SingleEmailMessage> {mail});
         }
         catch (Exception e){
            throw new AuraHandledException(e.getMessage());
            //return null;
         }
      }
}