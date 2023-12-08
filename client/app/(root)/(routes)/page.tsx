import { UserButton } from "@clerk/nextjs";

const RootPage = () => {
    return (
        <div>
            <UserButton afterSignOutUrl="/sign-in" />
        </div>
    );
}

export default RootPage;