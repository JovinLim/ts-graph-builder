import { Component, createSignal, Show } from 'solid-js'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { setAlerts, alerts } from './shared';

const AlertManager: Component = () => {

	function removeAlert(id: string) {
		setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
	}

	return (
		<div class='flex flex-col gap-y-3 alert-container rounded'>
			{alerts().map((alert) => (
				<Alert class='flex flex-row bg-red-100 gap-x-2 w-auto'>
					<div>
						<AlertTitle>{alert.title}</AlertTitle>
						<AlertDescription>{alert.message}</AlertDescription>
					</div>
					<button onClick={() => removeAlert(alert.id)} class="bg-transparent cursor-pointer text-xl text-black align-text-top px-2 z-1000">&times;</button>
				</Alert>
			))}
		</div>
	);
};

export default AlertManager