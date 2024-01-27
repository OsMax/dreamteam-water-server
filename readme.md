# https://dreamteam-water-server.onrender.com
# Лайт версія документації


## TEST USER      
    "email":"testUser@gmail.com",
    "password":"test1234"


## USER
Запит на регістрацію користувача - очікує { email, password }

      POST: https://dreamteam-water-server.onrender.com/api/user/register

Запит на логінізацію користувача - очікує { email, password }

      POST: https://dreamteam-water-server.onrender.com/api/user/login

Вихід 

      POST: https://dreamteam-water-server.onrender.com/api/user/logout

Отримання користувача за токеном

      GET:  https://dreamteam-water-server.onrender.com/api/user/current

Зміна аватарки - очікує { file }

       PATCH: https://dreamteam-water-server.onrender.com/api/user/avatars

Верифікація пошти

      GET:  https://dreamteam-water-server.onrender.com/api/user/verify/:verificationToken

Реверифікація - очікує { email }

      POST: https://dreamteam-water-server.onrender.com/api/user/verify

Повертає інформацію поточного користувача

      GET:  https://dreamteam-water-server.onrender.com/api/user/info

Редагування інформації про користувача - очікує {name, email, gender, password}, 
                                                  або {name, email, gender, password, newPassword}

      PUT:  https://dreamteam-water-server.onrender.com/api/user/info



## WATER
