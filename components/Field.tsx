type FieldProps = {
  label: string;
  children: React.ReactNode;
  helperText?: string;
};

export function Field({ label, children, helperText }: FieldProps) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold text-neutral-950">{label}</span>
      {children}
      {helperText ? (
        <span className="text-xs text-neutral-500">{helperText}</span>
      ) : null}
    </label>
  );
}
