const Yup = require('yup');

exports.schema = Yup.object().shape({
    fullname: Yup.string().required("پر کردن این بخش الزامی است").min(4, "نباید کمتر از 4 کاراکتر باشد").max(100, "نباید بیشتر از 100 باشد"),
    email: Yup.string().email("ایمیل معتبر نمی باشد").required("پر کردن این بخش الزامی است"),
    password: Yup.string().required("پر کردن این بخش الزامی است").min(4, "نباید کمتر از 4 کاراکتر باشد").max(100, "نباید بیشتر از 100 باشد"),
    ConfirmPassword: Yup.string().required("پر کردن این بخش الزامی است").oneOf([Yup.ref("password"), null], "کلمه عبور یکسان نیست")
})
