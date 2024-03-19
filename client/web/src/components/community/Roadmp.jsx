import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

const Roadmp = (props) => {
    return (
        <div>
            <Card className="max-w-[200px] bg-black">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md text-white">{props.specilisation}</p>
                        <p className="text-small text-default-500">{}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className='text-slate-600'>
                    <p>{props.prerequis}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="https://roadmap.sh/"
                    >
                        voir roadmap        
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Roadmp
