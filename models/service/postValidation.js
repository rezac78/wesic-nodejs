const Yup = require('yup');

exports.schema = Yup.object().shape({
    title:Yup.string().required("نوشت عنوان الزامی است").min(3,"نباید کمتر از 3 تا باشد").max(100,"نباید بیشتر از 100 تا باشد"),
    content:Yup.string().required("باید دارای مقدار باشد "),
    images:Yup.object().shape({
        name:Yup.string().required("عکس الزامی است"),
        size:Yup.number().max(4000000,"عکس نباید بیشتر از 4 مگابایت باشد"),
        mimetype:Yup.mixed().oneOf(["image/jpeg","image/png"],"فقط فرمت های jpg , png پشتی بانی میشوند")
    })
})

