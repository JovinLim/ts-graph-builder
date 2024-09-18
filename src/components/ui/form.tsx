import { cn } from "@/libs/cn";
import type {
	DialogContentProps,
	DialogDescriptionProps,
	DialogTitleProps,
} from "@kobalte/core/dialog";
import { Dialog as DialogPrimitive } from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

export const Form = DialogPrimitive;
export const FormTrigger = DialogPrimitive.Trigger;

// Centered form variants
export const formVariants = cva(
	"fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out duration-200 rounded-lg",
	{
		variants: {},
	}
);

type formContentProps<T extends ValidComponent = "div"> = ParentProps<
	DialogContentProps<T> & {
		class?: string;
	}
>;

export const FormContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, formContentProps<T>>
) => {
	const merge = mergeProps<formContentProps<T>[]>(props);
	const [local, rest] = splitProps(merge as formContentProps, [
		"class",
		"children",
	]);

	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay
				class={cn(
					"fixed inset-0 z-50 bg-background/80 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0"
				)}
			/>
			<DialogPrimitive.Content
				class={cn(
					formVariants({ class: local.class }),
					"left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
				)}
				{...rest}
			>
				{local.children}
				<DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-[opacity,box-shadow] hover:opacity-100 focus:outline-none focus:ring-[1.5px] focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="h-4 w-4"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18 6L6 18M6 6l12 12"
						/>
						<title>Close</title>
					</svg>
				</DialogPrimitive.CloseButton>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
};

type formTitleProps<T extends ValidComponent = "h2"> = DialogTitleProps<T> & {
	class?: string;
};

export const FormTitle = <T extends ValidComponent = "h2">(
	props: PolymorphicProps<T, formTitleProps<T>>
) => {
	const [local, rest] = splitProps(props as formTitleProps, ["class"]);

	return (
		<DialogPrimitive.Title
			class={cn("text-lg font-semibold text-foreground", local.class)}
			{...rest}
		/>
	);
};

type formDescriptionProps<T extends ValidComponent = "p"> =
	DialogDescriptionProps<T> & {
		class?: string;
	};

export const FormDescription = <T extends ValidComponent = "p">(
	props: PolymorphicProps<T, formDescriptionProps<T>>
) => {
	const [local, rest] = splitProps(props as formDescriptionProps, ["class"]);

	return (
		<DialogPrimitive.Description
			class={cn("text-sm text-muted-foreground", local.class)}
			{...rest}
		/>
	);
};

export const FormHeader = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)}
			{...rest}
		/>
	);
};

export const FormFooter = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			class={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				local.class
			)}
			{...rest}
		/>
	);
};
