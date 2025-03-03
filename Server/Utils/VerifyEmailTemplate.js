const verifyEmailTemplate = ({name,url})=>{
    return `
    <p>Dear ${name}</p>
    <p>Thank You For Registering Blinkit.</p>
    <a href=${url} style="color : black; background :orange; margin-top : 10px; padding : 10px;">
    Verify Email
    </a>
    `
}
export default verifyEmailTemplate