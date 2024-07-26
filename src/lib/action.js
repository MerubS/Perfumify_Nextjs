'use server';
export async function getFormData(FormData) {

    const userCredentials = {
     email : FormData.get('email'),
     password : FormData.get('password')
    }

    console.log(userCredentials);
 }