import { MailSlurp } from 'mailslurp-client';

export class emailUtils{
    private mailSlurp: MailSlurp;

    constructor(){
        this.mailSlurp = new MailSlurp({ apiKey: process.env.MAIL_SLURP_API_KEY! });
    }

    public async createInbox(){
        const inbox = await this.mailSlurp.inboxController.createInboxWithDefaults();
        return inbox;
    }

    public async waitForEmail(inboxId: string){
        const email = await this.mailSlurp.waitForLatestEmail(inboxId, 30000);
        return email;
    }
}




























