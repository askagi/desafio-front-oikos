interface Props {
    title: string;
    subtitle: string;
}

export function LoginHeader({ title, subtitle }: Props) {
    return (
        <div className="mb-5">
            <h4 className="">{title}</h4>
            <span className="text-secondary">{subtitle}</span>
        </div>
    )
}