import { Request, Response } from "express";
import createUser from "./services/createUser";

export function helloWorld(req: Request, res: Response) {
  const user = createUser({
    email: 'william@asdsa.com',
    password: '123213',
    techs: ['Node', 'React', 'Swift', 'React Native', 'Flutter', 
    {title: 'Dart', exp: 100},
    
  ]
  });

  console.log(user.email)

  return res.json({ message: "HelloWorld" });
}
