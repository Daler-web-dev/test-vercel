"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthComponent() {
	const { data: session } = useSession();

	if (session) {
		const user = session.user;

		return (
			<Card className="max-w-sm mx-auto mt-10 shadow-lg">
				<CardHeader className="flex flex-col items-center">
					<Avatar className="w-20 h-20">
						<AvatarImage src={user?.image || ""} />
						<AvatarFallback>
							{user?.name?.slice(0, 2).toUpperCase() || "US"}
						</AvatarFallback>
					</Avatar>

					<CardTitle className="mt-4 text-center">
						{user?.name || "User"}
					</CardTitle>
				</CardHeader>

				<CardContent className="text-center space-y-4">
					<p className="text-muted-foreground">{user?.email}</p>

					<Button
						variant="destructive"
						className="w-full"
						onClick={() => signOut()}
					>
						Sign out
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="flex justify-center mt-10">
			<Button onClick={() => signIn()} className="px-6 py-3">
				Sign in
			</Button>
		</div>
	);
}
