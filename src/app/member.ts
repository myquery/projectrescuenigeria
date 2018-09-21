export class Member {
    public $key: string;
    public surname: string;
    public firstname: string;
    public othername: string;
    public email: string;
    public phone: number;
    public gender: number;
    public dob: string;
    public address: number;
    public state: string;
    public voters_reg_number: number;
    
   

    constructor(userdata:any ){

                    this.$key = userdata.key;
                    this.surname = userdata.surname;
                    this.firstname = userdata.firstname;
                    this.othername = userdata.othername;
                    this.email = userdata.email;
                    this.phone = userdata.phone;
                    this.gender = userdata.gender;
                    this.dob = userdata.dob;
                    this.address = userdata.address;
                    this.state = userdata.state;
                    this.voters_reg_number = userdata.voters_reg_number;


                }

        
};